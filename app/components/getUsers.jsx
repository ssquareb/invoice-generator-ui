import React from 'react';

class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = { empolyees: [] };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount(e) {
    fetch('https://api.mocki.io/v1/b043df5a', {
      method: 'get',
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ empolyees: data });
        // Here you need to use an temporary array to store NeededInfo only
      });
  }
  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>City</th>
          </tr>
          <ul>
            <tr>
              <td>
                {this.state.empolyees.map(employee => (
                  <li key={employee}>
                    {employee.name},{employee.city}
                  </li>
                ))}
              </td>
            </tr>
          </ul>
        </table>
      </div>
    );
  }
}
export default Hello;
