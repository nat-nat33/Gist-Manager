const GistItem = React.createClass({
  render: function () {
    return (
      <div className='GistItem'>
        <h3>Title: {this.props.title}</h3>
        <p>description: {this.props.description}</p>
      </div>
      )
  }
})