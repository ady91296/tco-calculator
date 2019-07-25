class TcosController < ApplicationController
  include TcosHelper

  def index
  end
  
  def new
    session[:order_params] ||= {}
    @order = Tco.new(session[:order_params])
  end
  
  def create
    session[:order_params] ||= {}
    @order = Tco.new(session[:order_params])
    if !session[:value].present?
      @order.current_step = @order.init_step
    else
      @order.current_step = session[:order_step]
    end
    session[:tco] = params
    session[:value] ||= {}
    session[:value].deep_merge!(session[:tco].to_enum.to_h) if session[:tco]
    if @order.valid?
      if params[:back_button]
        @order.previous_step     
      elsif @order.last_step?
        if @order.save
          redirect_to '/calculate'
        end
      else
        @order.next_step
      end
      session[:order_step] = @order.current_step
    end
    if @order.new_record?
      render "new"
    end
  end

  def render_back_server
    respond_to do |format|
      format.js
    end
  end

  def calculate
    calculate_values
  end

  def reset
    session.delete("value")
    redirect_to root_path
  end
end
