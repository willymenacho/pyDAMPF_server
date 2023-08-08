import React from "react"
import Layout from "../layouts/ClientLayout"

const withClientLayout = (WrappedComponent) => (props) => {
  return (
    <Layout>
      <WrappedComponent {...props} />
    </Layout>
  )
}

export default withClientLayout
