import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('d0a58d7a-f59e-440e-baf9-c84dad4ec868', '1Laura_Jaskolski@gmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=3', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('ce84ff00-dae4-467d-8197-71b18d744bb3', '17Hildegard_Hintz52@hotmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=19', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('da2b488d-18a2-499d-afc6-081e14d6c2aa', '25Cedrick_Metz@hotmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=27', 'inv456def', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('66406f7e-1a27-4f81-90ee-35d8f798277c', '33Annalise.Legros36@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=35', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('10685e8f-f199-471a-bb05-cd24df36225e', '41Gayle60@yahoo.com', 'Michael Johnson', 'https://i.imgur.com/YfJQV5z.png?id=43', 'inv789ghi', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1e1661d2-2bd2-402a-b9a5-fa0ef0049c78', '49Benedict_Feeney@gmail.com', 'Michael Johnson', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a6a7a377-a974-41ce-b6b9-c87b559672e0', '57Ricky_Kertzmann@hotmail.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=59', 'inv012jkl', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c8caace1-1c18-4845-a6a6-99608c3f4325', '65Horacio.Rowe@yahoo.com', 'Michael Johnson', 'https://i.imgur.com/YfJQV5z.png?id=67', 'inv345mno', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('54fd94e9-9c1d-4f8f-b1f5-f7e38ea6d3fd', '73Jason_Hane61@gmail.com', 'Alex Jones', 'https://i.imgur.com/YfJQV5z.png?id=75', 'inv123abc', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('21cca974-efc9-405b-8ab4-b77496ddfd52', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=82');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('2340c651-9d92-4340-a9ff-83e31e3268a2', 'Digital Dynamics LLC', 'https://i.imgur.com/YfJQV5z.png?id=85');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('18280674-febf-4def-8b50-a793f1c65758', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=88');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('ea98d966-98c2-45f7-a9b8-356e68e6649c', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=91');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('3b80775b-bbc0-4595-902a-c957d0c165d0', 'AI Pioneers Co.', 'https://i.imgur.com/YfJQV5z.png?id=94');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('70e854e6-4969-465b-a6ed-4391f5ea0c64', 'Tech Innovators Inc.', 'https://i.imgur.com/YfJQV5z.png?id=97');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('58a6da4a-32d7-4cc2-bd5f-61f9818a3528', 'Digital Dynamics LLC', 'https://i.imgur.com/YfJQV5z.png?id=100');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('eb5e20f7-740f-43e4-870b-29792faf6ed8', 'NextGen Enterprises', 'https://i.imgur.com/YfJQV5z.png?id=103');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('f6af5317-9965-437f-950c-cee4ec035413', 'Digital Dynamics LLC', 'https://i.imgur.com/YfJQV5z.png?id=106');
INSERT INTO "Organization" ("id", "name", "pictureUrl") VALUES ('de3b6fdf-9d55-45ad-aeec-eb427f205d3e', 'AI Pioneers Co.', 'https://i.imgur.com/YfJQV5z.png?id=109');

INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('2b7eced5-6a69-4735-9a7c-780251f5c637', 'Admin', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '18280674-febf-4def-8b50-a793f1c65758');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('869fb63f-3f4c-425a-b36d-ed6f610bb92b', 'Developer', '54fd94e9-9c1d-4f8f-b1f5-f7e38ea6d3fd', '70e854e6-4969-465b-a6ed-4391f5ea0c64');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('34aed8b3-36d7-4178-8b7b-a4413a13dd1f', 'Developer', 'da2b488d-18a2-499d-afc6-081e14d6c2aa', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('573eeac7-9af8-4eb2-9680-d91250c69ad6', 'Manager', '10685e8f-f199-471a-bb05-cd24df36225e', '2340c651-9d92-4340-a9ff-83e31e3268a2');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('780fb5ce-e8f1-4c47-9461-4b546ae5d381', 'Manager', '10685e8f-f199-471a-bb05-cd24df36225e', 'eb5e20f7-740f-43e4-870b-29792faf6ed8');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('064753cb-eeb1-4d62-823b-81d7e047fd22', 'Admin', '54fd94e9-9c1d-4f8f-b1f5-f7e38ea6d3fd', 'ea98d966-98c2-45f7-a9b8-356e68e6649c');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('ff0be238-903c-433d-8042-8618d4a4c0e0', 'Support', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('b7844a70-52c7-4c6d-aa83-e877eb916b5e', 'Manager', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'ea98d966-98c2-45f7-a9b8-356e68e6649c');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('a8b19487-eb18-4df3-b629-4bddf2ec2e10', 'Developer', '1e1661d2-2bd2-402a-b9a5-fa0ef0049c78', '58a6da4a-32d7-4cc2-bd5f-61f9818a3528');
INSERT INTO "OrganizationRole" ("id", "name", "userId", "organizationId") VALUES ('ab666702-1b6a-4069-bc74-295e68e18572', 'Developer', '54fd94e9-9c1d-4f8f-b1f5-f7e38ea6d3fd', 'f6af5317-9965-437f-950c-cee4ec035413');

INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('7f4c5f07-f1c9-4204-90f8-79459854f408', 'Advanced FAQ Bot', 'Automates lead generation and initial contact.', 'Vendas', 'avanado', '21cca974-efc9-405b-8ab4-b77496ddfd52');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('0f6c7866-5d21-420e-a582-1458027f2fd1', 'Customer Support Assistant', 'Handles customer inquiries and support tickets.', 'Vendas', 'bsico', 'eb5e20f7-740f-43e4-870b-29792faf6ed8');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('3c6960b4-abf4-40f1-b673-46ed1847df90', 'Lead Generation Bot', 'Automates followup messages for sales prospects.', 'Transcrio', 'avanado', '70e854e6-4969-465b-a6ed-4391f5ea0c64');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('6cca6900-41b6-4f3f-bad8-551594437b8c', 'Audio Transcriber Pro', 'Automates followup messages for sales prospects.', 'Vendas', 'avanado', 'de3b6fdf-9d55-45ad-aeec-eb427f205d3e');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('3b033f0d-9fe8-46c3-8541-ef5cc2ec5ae5', 'Customer Support Assistant', 'Automates lead generation and initial contact.', 'Vendas', 'bsico', '21cca974-efc9-405b-8ab4-b77496ddfd52');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('fb90ecc6-a071-4291-8de1-430e69282c0a', 'Lead Generation Bot', 'Automates lead generation and initial contact.', 'Vendas', 'avanado', '18280674-febf-4def-8b50-a793f1c65758');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('3a19def4-9b58-4019-a126-cb078b5b6833', 'Lead Generation Bot', 'Automates followup messages for sales prospects.', 'Transcrio', 'avanado', 'ea98d966-98c2-45f7-a9b8-356e68e6649c');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('e3df1795-f67a-4160-9524-516279c8fef5', 'Audio Transcriber Pro', 'Converts audio messages to text with high accuracy.', 'Vendas', 'bsico', '18280674-febf-4def-8b50-a793f1c65758');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('f402327c-e7c1-4a0f-bc57-e5d92ccc0750', 'Lead Generation Bot', 'Automates followup messages for sales prospects.', 'Transcrio', 'bsico', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "Template" ("id", "name", "description", "category", "type", "organizationId") VALUES ('b4209b91-cecd-4fda-a89e-fcb0a89ac243', 'Lead Generation Bot', 'Automates lead generation and initial contact.', 'Vendas', 'bsico', '21cca974-efc9-405b-8ab4-b77496ddfd52');

INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('69df80d2-9f15-4579-bf97-2ca56adedc9e', 'Echo Expert', 'suspended', '1200', '2100', 'httpsexample.comqr4', 'e3df1795-f67a-4160-9524-516279c8fef5', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('aee933f9-0fa9-477d-b0f7-79cd1dbf78d6', 'Beta Bot', 'inactive', '1115', '1700', 'httpsexample.comqr3', '6cca6900-41b6-4f3f-bad8-551594437b8c', '58a6da4a-32d7-4cc2-bd5f-61f9818a3528');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('5fb8c37c-3603-4602-9fcf-1a000eca453e', 'Echo Expert', 'pending', '1000', '1700', 'httpsexample.comqr5', '3c6960b4-abf4-40f1-b673-46ed1847df90', '2340c651-9d92-4340-a9ff-83e31e3268a2');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('9b7dcd52-db20-476b-b4f5-3f0b7aadbe76', 'Agent Alpha', 'archived', '1115', '1830', 'httpsexample.comqr1', '0f6c7866-5d21-420e-a582-1458027f2fd1', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('b91472be-12cc-4141-81af-2e86035125e3', 'Echo Expert', 'inactive', '1000', '2015', 'httpsexample.comqr4', '3b033f0d-9fe8-46c3-8541-ef5cc2ec5ae5', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('24597112-f1df-4484-a08a-108990991cac', 'Gamma Guide', 'suspended', '0930', '2100', 'httpsexample.comqr3', 'f402327c-e7c1-4a0f-bc57-e5d92ccc0750', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('f099c5f3-2ba8-474c-9315-d570a67fc031', 'Gamma Guide', 'active', '1200', '1700', 'httpsexample.comqr4', '3a19def4-9b58-4019-a126-cb078b5b6833', '3b80775b-bbc0-4595-902a-c957d0c165d0');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('95576e0a-3265-4b99-9ca5-b5888963ca6e', 'Delta Dialogue', 'suspended', '0800', '2100', 'httpsexample.comqr2', 'fb90ecc6-a071-4291-8de1-430e69282c0a', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('ce5993a8-5263-4300-a2d8-3f0606a2094b', 'Beta Bot', 'pending', '1200', '2100', 'httpsexample.comqr4', '3c6960b4-abf4-40f1-b673-46ed1847df90', '2340c651-9d92-4340-a9ff-83e31e3268a2');
INSERT INTO "Agent" ("id", "name", "status", "workingHoursStart", "workingHoursEnd", "whatsappQrCode", "templateId", "organizationId") VALUES ('9e0945cf-426a-4bbd-9d6f-d04df41ef0c9', 'Agent Alpha', 'suspended', '0930', '2015', 'httpsexample.comqr4', '3b033f0d-9fe8-46c3-8541-ef5cc2ec5ae5', '18280674-febf-4def-8b50-a793f1c65758');

INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('0896147a-2608-43b8-ba6e-1f26014c8e85', 'user202', 'active', 462, 553, '24597112-f1df-4484-a08a-108990991cac');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('a850e0b4-aef3-40aa-974c-a97f4e9e9bae', 'user101', 'pending', 117, 154, '95576e0a-3265-4b99-9ca5-b5888963ca6e');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('1846c862-2d34-40e5-a9e8-71a86bf3b40c', 'user202', 'pending', 143, 541, '69df80d2-9f15-4579-bf97-2ca56adedc9e');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('fc98a2a7-e5c3-4981-bc1b-7eeff2dad90a', 'user456', 'pending', 427, 42, 'f099c5f3-2ba8-474c-9315-d570a67fc031');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('9e64a23b-592c-48f7-92e1-69f04da5da85', 'user202', 'active', 178, 913, 'aee933f9-0fa9-477d-b0f7-79cd1dbf78d6');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('b5d7d1f5-1113-45c4-8122-f5d48199cc4d', 'user202', 'active', 213, 155, 'b91472be-12cc-4141-81af-2e86035125e3');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('89b02f5f-4ed5-4730-abd1-546ee06057a6', 'user123', 'active', 383, 99, 'b91472be-12cc-4141-81af-2e86035125e3');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('858410dd-87b5-4dd7-98bc-45e763c86250', 'user202', 'active', 605, 210, '9b7dcd52-db20-476b-b4f5-3f0b7aadbe76');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('e1c622bc-f127-4c4e-856e-3bb14a495dde', 'user101', 'active', 188, 171, 'aee933f9-0fa9-477d-b0f7-79cd1dbf78d6');
INSERT INTO "Conversation" ("id", "externalUserId", "status", "messageCount", "responseTime", "agentId") VALUES ('51fb4a7d-8871-4b94-abbe-5f53fecb0a78', 'user123', 'pending', 476, 695, 'f099c5f3-2ba8-474c-9315-d570a67fc031');

INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('d579c711-93db-45c5-a891-7b5487b75ba0', 'N8N', '{"thymbra":"saepe","vociferor":"desparatus","reprehenderit":"arceo","sum":"spero"}'::jsonb, 'active', '70e854e6-4969-465b-a6ed-4391f5ea0c64');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('21a46fcb-a379-4442-9cd9-548af0c20e9c', 'Salesforce', '{"cruciamentum":"crepusculum","thalassinus":"absconditus","adfectus":"demum","suscipio":"coniecto","utor":"surgo"}'::jsonb, 'inactive', '2340c651-9d92-4340-a9ff-83e31e3268a2');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('d0f23a8a-3eb8-403b-a2c4-c2895dfe26b1', 'N8N', '{"amor":"cubitum","ver":"comitatus","deputo":"coaegresco","delectatio":"cena","tactus":"numquam"}'::jsonb, 'active', '3b80775b-bbc0-4595-902a-c957d0c165d0');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('ee926455-133b-465e-802a-04d3d69ea64a', 'WhatsApp', '{"celer":"credo","votum":"tabesco","decipio":"cunctatio"}'::jsonb, 'pending', '70e854e6-4969-465b-a6ed-4391f5ea0c64');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('42ebd539-42c1-4dc6-811b-2c86e7507681', 'N8N', '{"coadunatio":"reprehenderit","perferendis":"demens","labore":"copia","statua":"una"}'::jsonb, 'inactive', '70e854e6-4969-465b-a6ed-4391f5ea0c64');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('81cacb3c-b77b-4872-a874-3f2e70f69111', 'WhatsApp', '{"voluptates":"video","vulgaris":"advoco","et":"deputo","truculenter":"causa"}'::jsonb, 'inactive', 'ea98d966-98c2-45f7-a9b8-356e68e6649c');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('8e9fa5ec-6d7f-43c5-9ade-b8d30325cc48', 'Dify', '{"sollers":"adnuo","voluptate":"debilito","videlicet":"tamisium","sollicito":"curiositas","adhuc":"culpa"}'::jsonb, 'completed', '70e854e6-4969-465b-a6ed-4391f5ea0c64');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('97c2917f-44c6-4140-9b0b-6b00e49b6932', 'N8N', '{"absum":"sodalitas","terreo":"dedecor","vulpes":"toties","nam":"arcus"}'::jsonb, 'inactive', '3b80775b-bbc0-4595-902a-c957d0c165d0');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('211a79db-7f76-4fd3-a1ce-db38cbaf99cd', 'Salesforce', '{"addo":"id","tyrannus":"certus","laboriosam":"deludo"}'::jsonb, 'failed', 'ea98d966-98c2-45f7-a9b8-356e68e6649c');
INSERT INTO "Integration" ("id", "type", "config", "status", "organizationId") VALUES ('ed062e19-644e-48cf-af13-058d054c0521', 'Dify', '{"tum":"fugit","placeat":"valetudo","debilito":"abscido","adnuo":"doloremque","suscipio":"voco"}'::jsonb, 'inactive', 'ea98d966-98c2-45f7-a9b8-356e68e6649c');

INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('57d9aad6-e23f-4236-bf90-33d263aab8d1', 'Starter', 'inactive', '2024-10-26T18:17:45.605Z', '2025-04-25T11:10:01.175Z', 'de3b6fdf-9d55-45ad-aeec-eb427f205d3e');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('cd5f1e09-498e-43a6-927f-0c1f480b6eef', 'Starter', 'canceled', '2025-01-23T03:04:13.592Z', '2024-08-27T18:20:44.346Z', 'eb5e20f7-740f-43e4-870b-29792faf6ed8');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('0c997446-3cce-4116-8b61-9300a2f33f46', 'Professional', 'canceled', '2025-08-21T18:14:24.239Z', '2025-06-25T07:09:24.046Z', '2340c651-9d92-4340-a9ff-83e31e3268a2');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('5677997b-9dc4-4a22-9520-85188bc7928c', 'Professional', 'canceled', '2025-03-29T07:33:44.101Z', '2024-10-14T18:08:12.801Z', 'eb5e20f7-740f-43e4-870b-29792faf6ed8');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('8d2573bf-da90-4193-8b53-e5d8a94eb3a6', 'Enterprise', 'active', '2024-09-26T22:45:53.322Z', '2024-10-06T01:15:06.331Z', 'ea98d966-98c2-45f7-a9b8-356e68e6649c');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('546d1375-2161-406a-aca8-49e82f387467', 'Professional', 'active', '2025-01-28T12:42:50.812Z', '2025-03-18T10:20:26.681Z', 'ea98d966-98c2-45f7-a9b8-356e68e6649c');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('d9acce26-ad3a-41b1-bee2-044863c41175', 'Starter', 'pending', '2023-12-17T17:59:26.910Z', '2024-11-29T12:54:11.182Z', 'f6af5317-9965-437f-950c-cee4ec035413');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('6f47de88-9037-476c-9754-1c089a2c3561', 'Starter', 'active', '2024-07-06T13:11:55.090Z', '2025-05-23T23:12:17.409Z', '2340c651-9d92-4340-a9ff-83e31e3268a2');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('a891ce78-05cf-4a09-88ee-235d93ac1587', 'Enterprise', 'canceled', '2025-11-05T13:27:19.797Z', '2025-03-23T14:51:14.780Z', 'eb5e20f7-740f-43e4-870b-29792faf6ed8');
INSERT INTO "Subscription" ("id", "planType", "status", "currentPeriodStart", "currentPeriodEnd", "organizationId") VALUES ('d3fa08b3-396a-4b22-97fe-483227550023', 'Starter', 'active', '2024-11-03T04:48:10.842Z', '2025-11-04T10:08:31.151Z', '70e854e6-4969-465b-a6ed-4391f5ea0c64');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
