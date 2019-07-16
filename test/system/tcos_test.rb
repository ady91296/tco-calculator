require "application_system_test_case"

class TcosTest < ApplicationSystemTestCase
  setup do
    @tco = tcos(:one)
  end

  test "visiting the index" do
    visit tcos_url
    assert_selector "h1", text: "Tcos"
  end

  test "creating a Tco" do
    visit tcos_url
    click_on "New Tco"

    click_on "Create Tco"

    assert_text "Tco was successfully created"
    click_on "Back"
  end

  test "updating a Tco" do
    visit tcos_url
    click_on "Edit", match: :first

    click_on "Update Tco"

    assert_text "Tco was successfully updated"
    click_on "Back"
  end

  test "destroying a Tco" do
    visit tcos_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Tco was successfully destroyed"
  end
end
