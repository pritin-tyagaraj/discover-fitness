import React from 'react'
import { StyleSheet } from 'react-native'
import { Body, Container, H1, Header, Content, Text, Footer, FooterTab, Button, Icon, Thumbnail, Title, Right } from 'native-base'

export default class Dashboard extends React.Component {
  render () {
    return (
      <Container>
        <Header>
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right>
            {!this.props.isUserLoggedIn && (
              <Button
                transparent
                onPress={this.props.triggerLogin}>
                <Icon ios='ios-log-in' android="md-log-in" name="log-in" />
              </Button>
            )}
            {this.props.isUserLoggedIn && (
              <Button iconRight light>
                <Text>Hej, {this.props.userName}</Text>
                <Thumbnail small source={{ uri: this.props.userProfilePictureUrl }} />
              </Button>
            )}
          </Right>
        </Header>
        <Content>
          <H1>Hej, {this.props.userName}</H1>
        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button active>
              <Icon active name="navigate" />
            </Button>
            <Button>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
