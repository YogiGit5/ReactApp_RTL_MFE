import React from 'react'

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error?: any }>{
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error }
  }
  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return <div style={{color: 'crimson'}}>
        <h3>Something went wrong loading this microfrontend.</h3>
        <pre style={{whiteSpace:'pre-wrap'}}>{String(this.state.error)}</pre>
      </div>
    }
    return this.props.children
  }
}
