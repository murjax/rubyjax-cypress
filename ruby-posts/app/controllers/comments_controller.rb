class CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)

    respond_to do |format|
      if @comment.save
        format.html { redirect_to post_url(@comment.post), notice: "Comment was successfully created." }
        format.json { render :show, status: :created, location: @comment.post }
      else
        redirect_back fallback_location: posts_path
      end
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy!

    respond_to do |format|
      format.html { redirect_to post_url(comment.post), notice: "Comment was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

    def comment_params
      params.require(:comment).permit(:post_id, :content).merge(user_id: current_user.id)
    end
end
