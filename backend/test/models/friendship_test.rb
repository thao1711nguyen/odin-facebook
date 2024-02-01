require "test_helper"

class FriendshipTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "kilian has two friends" do
    assert users(:kilian).all_friends.length == 2
  end
  test "jack has two friends" do 
    assert users(:jack).all_friends.length == 2 
  end
  test "diana has two friends" do 
    assert users(:diana).all_friends.length == 2
  end

  test "alice has no friend" do 
    assert users(:alice).all_friends.length == 0
  end
end
