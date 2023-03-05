import { PartialType } from "@nestjs/swagger";
import { NotificationDto } from "./create-notification.dto";

export class UpdateIssueDto extends PartialType(NotificationDto) {}
