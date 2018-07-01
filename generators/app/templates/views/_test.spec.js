import { shallow } from 'vue-test-utils'
import <%= name %> from './<%= name %>.vue';

describe('<%= name %>.vue', () => {
  it('Is a Vue instance', () => {
    const wrapper = shallow(<%= name %>);
    expect(wrapper.isVueInstance()).toBe(true)
  })
})