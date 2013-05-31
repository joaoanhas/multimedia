class GrandslamsController < ApplicationController
  # GET /grandslams
  # GET /grandslams.json
  def index
    @grandslams = Grandslam.all


    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @grandslams }
    end
  end

  # GET /grandslams/1
  # GET /grandslams/1.json
  def show
    @grandslam = Grandslam.find(params[:id])
    @editions = @grandslam.editions.order("year")

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @grandslam }
    end
  end

  # GET /grandslams/new
  # GET /grandslams/new.json
  def new
    @grandslam = Grandslam.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @grandslam }
    end
  end

  # GET /grandslams/1/edit
  def edit
    @grandslam = Grandslam.find(params[:id])
  end

  # POST /grandslams
  # POST /grandslams.json
  def create
    @grandslam = Grandslam.new(params[:grandslam])

    respond_to do |format|
      if @grandslam.save
        format.html { redirect_to @grandslam, notice: 'Grandslam was successfully created.' }
        format.json { render json: @grandslam, status: :created, location: @grandslam }
      else
        format.html { render action: "new" }
        format.json { render json: @grandslam.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /grandslams/1
  # PUT /grandslams/1.json
  def update
    @grandslam = Grandslam.find(params[:id])

    respond_to do |format|
      if @grandslam.update_attributes(params[:grandslam])
        format.html { redirect_to @grandslam, notice: 'Grandslam was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @grandslam.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /grandslams/1
  # DELETE /grandslams/1.json
  def destroy
    @grandslam = Grandslam.find(params[:id])
    @grandslam.destroy

    respond_to do |format|
      format.html { redirect_to grandslams_url }
      format.json { head :no_content }
    end
  end
end
