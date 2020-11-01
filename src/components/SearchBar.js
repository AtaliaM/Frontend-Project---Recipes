import React from 'react';

class SearchBar extends React.Component {

    state = { term: '' };

    onInputChange = (event) => {
        this.setState({ term: event.target.value });
    }

    onFormSubmit = (event) => {
        event.preventDefault();
        //here will be callback from parent component
        this.props.fetchData(this.state.term);
    }

    render() {
        return (
            <div className="search-bar ui segment" style={{marginTop: "0", marginBottom: "20px", background: "transparent"}}>
                <form onSubmit={this.onFormSubmit} className="ui form">
                    <div className="field">
                        <label style={{fontSize: "25px", fontFamily:"'Pacifico', cursive", marginBottom:"20px"}}>Search for a recipe</label>
                        <input type="text" value={this.state.term} onChange={this.onInputChange} />
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;