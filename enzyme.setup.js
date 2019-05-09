/* eslint-disable import/no-extraneous-dependencies */
// ============================================================
// Import packages
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// ============================================================
// Configure
configure({ adapter: new Adapter() });
