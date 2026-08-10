declare module "react-vis-network-graph" {
  import type { CSSProperties } from "react"
  const VisNetwork: (props: {
    options?: Record<string, unknown>
    onInit?: (network: { fit: (options?: unknown) => void }) => void
    style?: CSSProperties
  }) => JSX.Element
  export default VisNetwork
}
