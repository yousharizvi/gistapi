import { Octokit } from "@octokit/rest";
import ls from "localstorage-ttl";

const octokit = new Octokit()

export const getPublicGists = () => octokit.gists.listPublic()

export const getGistForUser = username => {
  const cachedResponse = ls.get(username)
  if (cachedResponse) return Promise.resolve(cachedResponse)
  return octokit.gists.listForUser({ username })
    .then(response => {
      ls.set(username, response, 60 * 1000)
      return response
    })
}
