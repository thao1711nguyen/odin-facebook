require "test_helper"

class FriendRequestTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "default" do 
    assert_equal(users(:ana).id, friend_requests(:one).sender_id)
  end
  test "user can send many friend requests" do
    assert users(:ana).sent_requests.length == 3
  end
  test "user can receive many friend requests" do 
    assert users(:diana).received_requests.length == 2
  end

end
