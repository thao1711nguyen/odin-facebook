require "test_helper"

class ChatTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "ana has two chats" do 
    assert users(:ana).all_chats.length == 2
  end
  test "alice has two chats" do 
    assert users(:alice).all_chats.length == 2
  end
  test "chloe has two chats" do 
    assert users(:chloe).all_chats.length == 2 
  end
  test "david has no chat" do 
    assert users(:david).all_chats.length == 0
  end
end
