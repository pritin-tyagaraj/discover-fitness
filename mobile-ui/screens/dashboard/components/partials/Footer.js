import React from 'react'
import { Button, Footer, FooterTab, Icon } from 'native-base'

const DashboardFooter = (props) => {
  return (
    <Footer>
      <FooterTab>
        <Button>
          <Icon name="list" />
        </Button>
        <Button>
          <Icon name="people" />
        </Button>
        <Button active>
          <Icon active name="add-circle" />
        </Button>
        <Button>
          <Icon name="stats" />
        </Button>
        <Button>
          <Icon name="settings" />
        </Button>
      </FooterTab>
    </Footer>
  )
}

DashboardFooter.propTypes = {

}

DashboardFooter.defaultProps = {

}

export default DashboardFooter
