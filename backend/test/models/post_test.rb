require "test_helper"

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "ana'displayed_posts contain 3 posts and in order" do 
    current_user = users(:ana)
    expected_posts = [posts(:three), posts(:two), posts(:one)]
    assert current_user.displayed_posts.length == 3
    assert current_user.displayed_posts == expected_posts
  end
  

  test "alice has 2 displayed posts and in order" do 
    current_user = users(:alice)
    expected_posts = [posts(:two), posts(:one)]
    assert current_user.displayed_posts.length == 2
    assert current_user.displayed_posts == expected_posts
  end
  test "kilian has 1 displayed posts" do 
    current_user = users(:kilian)
    assert current_user.displayed_posts.length == 1
  end
end
