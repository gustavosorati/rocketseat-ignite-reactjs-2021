import { GetServerSideProps } from "next"
import { destroyCookie } from "nookies"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { setupApiClient } from "../services/api"
import { AuthTokenError } from "../services/errors/AuthTokenError"
import { withSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  return <h1>Dashboard {user?.email}</h1>
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx);

  const response = await apiClient.get('/me');
    
  console.log(response.data)

  return {
    props: {}
  }
})