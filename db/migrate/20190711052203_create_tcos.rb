class CreateTcos < ActiveRecord::Migration[5.2]
  def change
    create_table :tcos do |t|

      t.timestamps
    end
  end
end
