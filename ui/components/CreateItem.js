import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from '../components/ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
    ) {
        createItem(
            title: $title
            description : $description
            price: $price
            image: $image
            largeImage: $largeImage
        ) {
            id
        }
    }
`;

class CreateItem extends Component {
  state = {
    title: 'AR-15',
    description: 'Automatic, ammunition not provided. Legal, has appropriate paperwork',
    image: '',
    largeImage: '',
    price: 79999
  };

  handleChange = (e) => { // allow binding to class w/o calling constructor and .bind()
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({[name]: val}); // Computed property names (ES6 feat)
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, {loading, error}) => (
          <Form onSubmit={async (e) => {
            e.preventDefault();
            const response = await createItem();
            console.log(response);
          }}>
          <Error error = {error}/>
            <fieldset disabled = {loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input type="text"
                       id="title"
                       name="title"
                       placeholder="Title"
                       required
                       value={this.state.title}
                       onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input type="number"
                       id="price"
                       name="price"
                       placeholder="0.00"
                       required
                       value={this.state.price}
                       onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe your product"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
export {CREATE_ITEM_MUTATION};