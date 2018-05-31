import React from 'react';
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core';

// This code was inspired by https://material-ui.com/demos/buttons/#third-party-routing-library

const _Link = linkProps => props => <Link to={linkProps.to} {...props} />;

const IconLinkButton = (props) => (
    <IconButton component={_Link(props)} {...props}>
        {props.children}
    </IconButton>
);

export default IconLinkButton;
