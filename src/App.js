// import React from 'react';
// import Cart from './Cart';
// import Navbar from './Navbar';

// class App extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       products: [
//         {
//           price: 99,
//           title: 'Watch',
//           qty: 1,
//           img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
//           id: 1
//         },
//         {
//           price: 999,
//           title: 'Mobile Phone',
//           qty: 1,
//           img: 'https://images.unsplash.com/photo-1520923642038-b4259acecbd7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1306&q=80',
//           id: 2
//         },
//         {
//           price: 999,
//           title: 'Laptop',
//           qty: 1,
//           img: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1330&q=80',
//           id: 3
//         }
//       ]
//     }
//     // this.increaseQuantity = this.increaseQuantity.bind(this);
//     // this.testing();
//   }
//   handleIncreaseQuantity = (product) => {
//     console.log('Heyy please inc the qty of ', product);
//     const { products } = this.state;
//     const index = products.indexOf(product);

//     products[index].qty += 1;

//     this.setState({
//       products
//     })
//   }
//   handleDecreaseQuantity = (product) => {
//     console.log('Heyy please inc the qty of ', product);
//     const { products } = this.state;
//     const index = products.indexOf(product);

//     if (products[index].qty === 0) {
//       return;
//     }

//     products[index].qty -= 1;

//     this.setState({
//       products
//     })
//   }
//   handleDeleteProduct = (id) => {
//     const { products } = this.state;

//     const items = products.filter((item) => item.id !== id); // [{}]

//     this.setState({
//       products: items
//     })
//   }

//   getCartCount = () => {
//     const { products } = this.state;

//     let count = 0;

//     products.forEach((product) => {
//       count += product.qty;
//     })

//     return count;
//   }

//   getCartTotal = () => {
//     const { products } = this.state;

//     let cartTotal = 0;

//     products.map((product) => {
//       if (product.qty > 0) {
//       cartTotal = cartTotal + product.qty * product.price
//       }
//       return '';
//     });

//     return cartTotal;
//   }
//   render() {
//     const { products } = this.state;
//     return (
//       <div className="App">
//         <Navbar count={this.getCartCount()} />
//         <Cart
//           products={products}
//           onIncreaseQuantity={this.handleIncreaseQuantity}
//           onDecreaseQuantity={this.handleDecreaseQuantity}
//           onDeleteProduct={this.handleDeleteProduct}
//         />
//         <div style={{ padding: 10, fontSize: 20 }}>TOTAL: {this.getCartTotal()} </div>
//       </div>
//     );
//   }
// }

// export default App;



import React from "react";
import "./App.css";
// import CartItem from './CartItem';
import Cart from "./Cart";
import Navbar from "./Navbar";
import { getFirestore, collection, deleteDoc, onSnapshot, updateDoc, doc } from 'firebase/firestore';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true
    };
    this.db = getFirestore()
  }

  componentDidMount() {
    let colRef = collection(this.db, "products")

    onSnapshot(colRef, (snapshot) => {
      const products = snapshot.docs.map((doc) => {
        let data = doc.data();
        data['id'] = doc.id
        return data;
      })
      this.setState({
        products: products,
        loading: false
      })
    })
  }

  // handleIncreaseQuantity = async(product) => {
  //   const { products } = this.state;
  //   const index = products.indexOf(product);
  //   const 
  //   products[index].qty += 1;

  //   this.setState({
  //     products
  //   });
  // };

  // handleDecreaseQuantity = product => {
  //   const { products } = this.state;
  //   const index = products.indexOf(product);

  //   if (products[index].qty === 0) {
  //     return;
  //   }
  //   products[index].qty -= 1;

  //   this.setState({
  //     products
  //   });
  // };

  // handleDeleteProduct = id => {
  //   const { products } = this.state;

  //   const items = products.filter(product => product.id !== id);

  //   this.setState({
  //     products: items
  //   });
  // };
  handleIncreaseQuantity = async (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    const docRef = doc(this.db, "products", products[index].id);
    updateDoc(docRef, {
      qty: products[index].qty + 1
    }).then(() => {
      products[index].qty += 1
      this.setState({
        products: products
      })
    }).catch((error) => { console.log(error); })
  }


  handleDecreaseQuantity = async (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    const docRef = doc(this.db, "products", products[index].id);
    updateDoc(docRef, {
      qty: products[index].qty - 1
    }).then(() => {
      products[index].qty -= 1
      this.setState({
        products: products
      })
    }).catch((error) => { console.log(error.message); })
  }


  handleDeleteProduct = (id) => {
    const { products } = this.state;

    const docRef = doc(this.db, "products", id);
    deleteDoc(docRef).then(() => {
      const items = products.filter((product) => product.id !== id)
      this.setState({
        products: items
      })
    })
  }


  getcountOfCartItems = () => {
    const { products } = this.state;
    let count = 0;

    products.forEach(product => {
      count += product.qty;
    });

    return count;
  };

  getcartTotal = () => {
    const { products } = this.state;
    let cartTotal = 0;

    products.map(product => {
      if (product.qty > 0) {
        cartTotal = cartTotal + product.qty * product.price;
      }
      return "";
    });

    return cartTotal;
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getcountOfCartItems()} />
        <Cart
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
          products={products}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL : {this.getcartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
