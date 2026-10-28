const { withTransaction } = require('../../config/db');
const ApiError = require('../../utils/ApiError');
async function submitApplication(input) {
  try {
    const applicantId = await withTransaction(async (db) => {
      const { rows } = await db.query(
        `INSERT INTO applicants (first_name, last_name, email, phone, profession, license_number, years_experience, city, region, cover_note)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
        [input.firstName, input.lastName, input.email, input.phone, input.profession, input.licenseNumber || null,
         input.yearsExperience ?? null, input.city || null, input.region || null, input.coverNote || null]
      );
      const id = rows[0].id;
      await db.query(`INSERT INTO applicant_status_history (applicant_id, from_status, to_status, note) VALUES ($1,NULL,'applied','Application submitted')`, [id]);
      return id;
    });
    return { reference: applicantId.slice(0, 8).toUpperCase() };
  } catch (err) {
    if (err.code === '23505') throw ApiError.conflict('You already have an active application for this profession');
    throw err;
  }
}
module.exports = { submitApplication };
