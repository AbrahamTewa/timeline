import { connect } from 'react-redux';
import Timeline from '../components/Timeline';




function mapStateToProps (state) {
    return { title: state.action.title };
}

const Timeline = connect(mapStateToProps)(Title);

export default CurrentTitle;
