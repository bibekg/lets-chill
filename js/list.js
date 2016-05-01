
// every render function HAS to return something
var Header = React.createClass({
	getInitialState: function (){
		return {
			header : this.props.header
		}
	},
	render: function() {
		return (
			<div className="header-wrapper">
			<h1>Search some of your favorite JS tools </h1>
			</div>
			);
	}
});

var List = React.createClass({
	render: function(){
		return (
			<ul>
			{this.props.items.map(function(item) {
				return <li key = {item}>{item}</li>
			})
		}	
		</ul>
		)
	}
});

var FilteredList = React.createClass({

	filterList: function(event) {
		// filter list based on text input

		var updateList = this.state.initialItems;
		updateList = updateList.filter(function(item){
			return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
		});
		this.setState({items: updateList});
	},

	getInitialState:function () {
		return {
			initialItems:  [
			"Sahil Gandhi",
			"Anshul Aggarwal",
			"CJ Ordog",
			"Vansh Gandhi",
            "Kobe Bryant"
			],
			items: []
		}
	},

	componentWillMount: function() {
		this.setState({items: this.state.initialItems});
	},

	render: function() {
		return(
			<div className = "filter-list">
			<Header />
			<input className = "input-list" type = "text" placeholder="Search..." onChange = {this.filterList} />
			<List items = {this.state.items} />
			</div>
			);
	}
});

ReactDOM.render(<FilteredList/>, document.getElementById('who'));