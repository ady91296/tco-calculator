require 'test_helper'

class TcosControllerTest < ActionDispatch::IntegrationTest
  setup do
    @tco = tcos(:one)
  end

  test "should get index" do
    get tcos_url
    assert_response :success
  end

  test "should get new" do
    get new_tco_url
    assert_response :success
  end

  test "should create tco" do
    assert_difference('Tco.count') do
      post tcos_url, params: { tco: {  } }
    end

    assert_redirected_to tco_url(Tco.last)
  end

  test "should show tco" do
    get tco_url(@tco)
    assert_response :success
  end

  test "should get edit" do
    get edit_tco_url(@tco)
    assert_response :success
  end

  test "should update tco" do
    patch tco_url(@tco), params: { tco: {  } }
    assert_redirected_to tco_url(@tco)
  end

  test "should destroy tco" do
    assert_difference('Tco.count', -1) do
      delete tco_url(@tco)
    end

    assert_redirected_to tcos_url
  end
end
