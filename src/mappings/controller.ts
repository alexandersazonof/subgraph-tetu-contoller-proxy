import { Upgraded } from "../../generated/Controller/Controller";
import { log } from "@graphprotocol/graph-ts";
import { ControllerImplementation } from "../../generated/schema";

export function handleUpgraded(event: Upgraded): void {
  const implementation = event.params.implementation
  log.log(log.Level.INFO, `handleUpgraded new impl ${implementation.toHexString()}`)
  let controller = ControllerImplementation.load(implementation.toHexString())
  if (controller == null) {
    controller = new ControllerImplementation(implementation.toHexString())
  }
  controller.upgradedAtBlock = event.block.number
  controller.save()
}