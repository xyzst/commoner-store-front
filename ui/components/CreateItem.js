import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag';
import formatMoney from '../lib/formatMoney';
import Error from '../components/ErrorMessage';
import Router from 'next/router';

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
    image: 'ar-15.jpg',
    largeImage: 'large-ar-15.jpg',
    price: 79999
  };

  handleChange = (e) => { // arrow function instead to allow binding to class w/o calling constructor and .bind()
    const {name, type, value} = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({[name]: val}); // Computed property names (ES6 feat)
  };

  uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData(); // FormData API (ES6)
    data.append('file', files[0]);
    data.append('upload_preset', 'foo3hldm'); // Cloudinary upload preset

    const res = await fetch('https://api.cloudinary.com/v1_1/dh46flsyc/image/upload', {
      method: 'POST',
      body: data
    });

    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, {loading, error}) => (
          <Form onSubmit={async (e) => {
            // Stop form from submitting
            e.preventDefault();
            // Call the mutation
            const response = await createItem();
            // Change to single item page
            console.log(response);
            Router.push({
              pathname: '/item',
              query: { id: response.data.createItem.id }
            });
          }}>
            <Error error={error}/>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input type="file"
                       id="file"
                       name="file"
                       placeholder="Upload an image"
                       required
                       onChange={this.uploadFile}
                />
                {this.state.image && (<img src={this.state.image} width="200" alt="Upload preview" />)}
              </label>
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