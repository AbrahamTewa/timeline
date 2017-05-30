import { connect } from 'react-redux';
import EditableLabel from '../components/EditableLabel';
import {renameFile} from '../redux/document';

function mapStateToProps (state) {
    return { className: 'title'
           , label    : state.document.name};
}

function mapDispatchToProps(dispatch) {
    return {onChange: (name) => dispatch(renameFile(name)) };
}

const Title = connect(mapStateToProps, mapDispatchToProps)(EditableLabel);

export default Title;
