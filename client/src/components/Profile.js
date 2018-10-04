import React from 'react'
import Styled from 'styled-components';
import { Grid, Container, Divider, Header, Image} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';

class Profile extends React.Component {
    state = { editing: false, formValues: { name: '', email: '', file: '' } }

    static getDerivedStateFromProps(props, state) {
        const { user } = props 
        const { formValues, editing } = state 
        if (user.name !== formValues.name && !editing) {
          return { formValues: {name: user.name, email: user.email } }
        }
      }

    handleOnDrop = (files, rejectedFiles) => {
        this.setState({ formValues: { ...this.state.formValues, file: files[0] } })
    }

    addGallery = () => {
        const { formValues: { file } } = this.state;
    return(
        <Grid.Column width={4}>
            <Dropzone
            onDrop={this.handleOnDrop}
            multiple={false}
            >
                { file && <Image src={file.preview} alt="upload preview"/> }
            </Dropzone>
        </Grid.Column>
    )
    }

    profileView = () => {
        const { user } = this.props;
        return (
          <>  
              <Header as="h1">{user.name}</Header>
          </>
        )
      }

    

    render() {
        return(   
            <Container>
                <Head>
                    Welcome { this.profileView() }
                </Head>
                <div>
                    { this.addGallery() }
                </div>
            <Divider hidden />
            </Container>
        )
    }
}
    

const Head = Styled.div`
font-size: 25px;
padding: 10px;
margin: 10px;
`



const mapStateToProps = (state) => {
    return { user: state.user }
  }
  
  export default connect(mapStateToProps)(Profile);