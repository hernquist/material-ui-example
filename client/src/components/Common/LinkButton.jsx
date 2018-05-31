import React from 'react';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

// This code was inspired by https://material-ui.com/demos/buttons/#third-party-routing-library

const _Link = linkProps => props => <Link to={linkProps.to} {...props} />;

const LinkButton = (props) => (
    <Button component={_Link(props)} { ...props }>
        {props.children}
    </Button>
);

export default LinkButton;
