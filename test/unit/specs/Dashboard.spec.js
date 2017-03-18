import Vue from 'vue'
import Dashboard from 'renderer/components/Dashboard'


describe('Dashboard', () => {

  it('has a data function', () => {
    (typeof Dashboard.data).should.equal('function');
  })

  it('has a addToken method', () => {
    (typeof Dashboard.methods.addToken).should.equal('function');
  })

  it('has a createAccount mthod', () => {
    (typeof Dashboard.methods.createAccount).should.equal('function');
  })

  it('sets the correct default data', () => {
    const defaultData = Dashboard.data()
    defaultData.loading.should.equal(false)
  })

  // it('correctly sets the message when created', () => {
  //   const vm = new Vue(MyComponent).$mount()
  //   expect(vm.message).toBe('bye!')
  // })

  // it('renders the correct message', () => {
  //   const Ctor = Vue.extend(MyComponent)
  //   const vm = new Ctor().$mount()
  //   expect(vm.$el.textContent).toBe('bye!')
  // })
})