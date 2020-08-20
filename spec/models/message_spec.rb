require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do

    context '保存できる' do
      it 'メッセージがあるとき' do
        expect(build(:message, image: nil)).to be_valid
      end

      it '画像があるとき' do
        expect(build(:message, content: nil)).to be_valid
      end

      it 'メッセージと画像があるとき' do
        expect(build(:message)).to be_valid
      end
    end

    context '保存できない' do
      
      it 'メッセージも画像もないとき' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include("translation missing: ja.activerecord.errors.models.message.attributes.content.blank")
      end
      
      it 'group_idが無いとき' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("translation missing: ja.activerecord.errors.models.message.attributes.group.required")
      end
      
      it 'user_idが無いとき' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("translation missing: ja.activerecord.errors.models.message.attributes.user.required")
      end
    end

  end
end