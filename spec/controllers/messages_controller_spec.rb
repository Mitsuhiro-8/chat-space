require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'ログインしている場合' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

        it '@messageが使用できるか' do
          expect(assigns(:message)).to be_a_new(Message)
        end

        it '@groupが使用できるか' do
          expect(assigns(:group)).to eq group
        end
        
        it '該当するビューが描画されているか' do
          expect(response).to render_template :index
        end
    end

    context 'ログインしていない場合' do
      before do
        get :index, params: { group_id: group.id }
      end

      it '意図したビューにリダイレクトできているか' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end


  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'ログインしている場合' do
      before do
        login user
      end
      context '保存に成功した場合' do
        subject {
          post :create,
          params: params
        }
        
        it 'メッセージの保存ができたのか' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it '意図した画面に遷移しているか' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
      
      context '保存に失敗した場合' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }
        
        it 'メッセージの保存は行われなかったか' do
          expect{ subject }.not_to change(Message, :count)
        end

        it '意図したビューが描画されているか' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'ログインしていない場合' do

      it '意図した画面にリダイレクトできているか' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end