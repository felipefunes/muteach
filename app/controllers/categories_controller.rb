class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :edit, :update]
  def index
    @categories = Category.all
    respond_to do |format|
      format.html 
      format.json { render json: @categories, status: :ok }
    end
  end

  def show
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      redirect_to categories_path, notice: 'Category was successfully created.'
    else
      render action: :new
    end
  end

  def edit
  end

  def update
    if @category.update(category_params)
      redirect_to categories_path, notice: 'Category was successfully updated.'
    else
      render action: :edit
    end
  end

  def destroy
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:name, :description)
  end
end
