import React from 'react'
import { List } from 'semantic-ui-react'
import { FooterWrap } from './style'

const Footer = (props) => (
  <FooterWrap>
    <div className="footer-bottom-info">
      <div className="footer_segment">
        <div className="footer_segment_left">
          <p>&copy;2019 React login signUp flow. All Rights Reserved.</p>
        </div>
        <div className="footer_segment_right">
          <List horizontal>
            <List.Item className="footer-links">Disclaimer</List.Item>
            <List.Item className="footer-links">Privacy Policy</List.Item>
            <List.Item className="footer-links">Terms of Use</List.Item>
            <List.Item className="footer-links">FAQ</List.Item>
          </List>
        </div>
      </div>
    </div>
    </FooterWrap>
)

export default Footer
