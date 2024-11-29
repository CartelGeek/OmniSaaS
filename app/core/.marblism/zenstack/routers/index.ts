/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@zenstackhq/runtime/models";
import createUserRouter from "./User.router";
import createTemplateRouter from "./Template.router";
import createAgentRouter from "./Agent.router";
import createConversationRouter from "./Conversation.router";
import createIntegrationRouter from "./Integration.router";
import createSubscriptionRouter from "./Subscription.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as TemplateClientType } from "./Template.router";
import { ClientType as AgentClientType } from "./Agent.router";
import { ClientType as ConversationClientType } from "./Conversation.router";
import { ClientType as IntegrationClientType } from "./Integration.router";
import { ClientType as SubscriptionClientType } from "./Subscription.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        user: createUserRouter(router, procedure),
        template: createTemplateRouter(router, procedure),
        agent: createAgentRouter(router, procedure),
        conversation: createConversationRouter(router, procedure),
        integration: createIntegrationRouter(router, procedure),
        subscription: createSubscriptionRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    user: UserClientType<AppRouter>;
    template: TemplateClientType<AppRouter>;
    agent: AgentClientType<AppRouter>;
    conversation: ConversationClientType<AppRouter>;
    integration: IntegrationClientType<AppRouter>;
    subscription: SubscriptionClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
}
