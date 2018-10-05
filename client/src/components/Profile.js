import React from 'react'
import Styled from 'styled-components';
import { Grid, Container, Divider, Header, Image, Form, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';


class Profile extends React.Component {
    state = { gallery: [], editing: false, formValues: { name: '', email: '', file: '' } }

    static getDerivedStateFromProps(props, state) {
        const { user } = props 
        const { formValues, editing, gallery } = state 
        if (user.name !== formValues.name && !editing) {
          return { gallery: gallery, formValues: {name: user.name, email: user.email } }
        }
      }

    handleOnDrop = (files) => {
        this.setState({ formValues: { ...this.state.formValues, file: files[0] } })
    }

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     const { formValues } = this.state
    //     const { user, dispatch } = this.props;
    //     dispatch(updateGallery(user.id, formValues ))
    //     this.setState({ 
    //       editing: false,
    //       formValues: {
    //         ...this.state.formValues,
    //         file: ''
    //       }
    //      })
    //   }

    handleButton = () => {
        const { formValues: { file } } = this.state;
        if (file == null) {
            return(
                <div></div>
            )
        }else{
            return(
                <Button onClick={this.handleSubmit} width="200px">Add</Button>
            )
        }
    }

    addGallery = () => {
        const { formValues: { file } } = this.state;
    return(
        <Grid.Column width={4}>
        <Form onSubmit={this.handleSubmit}> 
            <Dropzone
            style={
                {"width" : "150px",
                "text-align" : "center", 
                "height" : "30px",
                "font-size" : "20px",
                "padding" : "5px",
                "margin-bottom" : "150px",
                "border" : "1px solid black",
                "background-color" : "rgb(255,136,77",
                "cursor" : "pointer"
                }
            }
            onDrop={this.handleOnDrop}
            multiple={false}
            >
            Add A Gallery
                { file && <Image src={file.preview} alt="upload preview"/> }
            </Dropzone>
        </Form>
        </Grid.Column>   
        )
    }

    profileView = () => {
        const { user } = this.props;
        return (
          <>  
              <Header as="h1">Welcome {user.name}</Header>
          </>
        )
      }

    render() {
        return(   
            <Container>
                <Head>
                    { this.profileView() }
                </Head>
                <Grid>
                    <Grid.Row>
                        { this.addGallery() }
                    </Grid.Row>
                    <Grid.Row>
                        { this.handleButton() }
                    </Grid.Row>
                </Grid> 
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