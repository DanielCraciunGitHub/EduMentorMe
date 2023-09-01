import { getRecentlyViewedResources } from "@/lib/getUserResources"

import ResourceLinksContainer from "./ResourceLinksContainer"

const RecentlyViewedResources = async () => {
  const resources = await getRecentlyViewedResources()

  return (
    <ul className="container">
      {resources ? <ResourceLinksContainer files={resources} /> : null}
    </ul>
  )
}

export default RecentlyViewedResources
