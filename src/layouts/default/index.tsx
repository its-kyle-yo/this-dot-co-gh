import DefaultHead from './head'
import DefaultProviders from './providers'
import DefaultShell from './shell'

 const DefaultLayout = ({ children }: any) => {
  return (
    <>
      <DefaultHead />
      <DefaultProviders>
        <DefaultShell>
          {children}
        </DefaultShell>
      </DefaultProviders>
    </>
  )
}

export default DefaultLayout;