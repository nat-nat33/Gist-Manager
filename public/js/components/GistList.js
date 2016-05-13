const GistList = React.createClass({
  render: function () {
    // var redditListNode = this.props.redditData.map(function(redditItem){
    //   console.log(redditItem.data.author)
    var gistItems = this.props.gists.map(function(gistItem){
      return (
        <GistItem title={ gistItem.title} description={gistItem.description} key={gistItem.id} >
        </GistItem>
        )
    });
    return (
      <div className='GistList'>
        <h2> Gist List Item </h2>
          {gistItems}
      </div>
      )
  }
});