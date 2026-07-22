const AUDIENCE_NAME = 'ZAK Fine Art Newsletter';

export async function getOrCreateAudienceId(resend) {
  if (process.env.RESEND_AUDIENCE_ID) return process.env.RESEND_AUDIENCE_ID;

  const { data: audienceList } = await resend.audiences.list();
  const existing = audienceList?.data?.find(a => a.name === AUDIENCE_NAME);
  if (existing) return existing.id;

  const { data: newAudience } = await resend.audiences.create({ name: AUDIENCE_NAME });
  return newAudience?.id || null;
}
