'use strict';

const AllGistContent = React.createClass({
  getInitialState: function () {
      return {
        redditData: []
      };
  },
  loadDataFromReddit: function () {
    $.ajax({
      url: this.props.redditUrl,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({
          redditData: data.data.children
        });
      }.bind(this)
    })
  },
  componentDidMount: function () {
    this.loadDataFromReddit()
  },
  render: function () {
    return (
      <div className="RedditPage">
        <h1> Reddit </h1>
          <RedditList redditData={this.state.redditData} />
      </div>
      )
    }
});

const RedditList = React.createClass({
  render: function () {
    var redditListNode = this.props.redditData.map(function(redditItem){
      console.log(redditItem.data.author)
      return (
        <RedditItem title={ redditItem.data.title} author={redditItem.data.author} key={redditItem.data.id} >
        </RedditItem>
        )
    })
    return (
      <div className='redditList'>
        <h2> Reddit List Item </h2>
        {redditListNode}
      </div>
      )
  }
});

const RedditItem = React.createClass({
  render: function () {
    return (
      <div className='redditItem'>
        <h3>Title: {this.props.title}</h3>
        <p>Author: {this.props.author}</p>
      </div>
      )
  }
})

ReactDOM.render(
  <RedditPage
  redditUrl='https://www.reddit.com/r/funny.json'
  />,
  document.getElementById('content')
  )