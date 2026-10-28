-- Milestone 2 Part 1 only: HR recruitment and caregiver account creation.

-- HR role is added here. Caregiver role is added in migration 003.
ALTER TABLE roles DROP CONSTRAINT IF EXISTS roles_name_check;
ALTER TABLE roles ADD CONSTRAINT roles_name_check CHECK (name IN ('client', 'staff', 'admin', 'hr'));

CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  profession VARCHAR(10) NOT NULL CHECK (profession IN ('RN', 'RPN', 'PSW', 'RSW')),
  license_number VARCHAR(100),
  years_experience SMALLINT CHECK (years_experience BETWEEN 0 AND 60),
  city VARCHAR(100),
  region VARCHAR(100),
  cover_note TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'applied'
    CHECK (status IN ('applied', 'screening', 'interview', 'offer', 'hired', 'rejected')),
  rejection_reason TEXT,
  hired_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX applicants_active_email_profession_uidx
  ON applicants (LOWER(email), profession) WHERE status NOT IN ('rejected', 'hired');
CREATE INDEX applicants_status_idx ON applicants (status);
CREATE INDEX applicants_profession_idx ON applicants (profession);
CREATE INDEX applicants_created_at_idx ON applicants (created_at DESC);
CREATE TRIGGER applicants_set_updated_at BEFORE UPDATE ON applicants FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TABLE applicant_status_history (
  id BIGSERIAL PRIMARY KEY,
  applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  from_status VARCHAR(20),
  to_status VARCHAR(20) NOT NULL,
  changed_by UUID REFERENCES users(id) ON DELETE SET NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX applicant_status_history_applicant_idx ON applicant_status_history (applicant_id, created_at);

CREATE TABLE caregiver_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  applicant_id UUID REFERENCES applicants(id) ON DELETE SET NULL,
  profession VARCHAR(10) NOT NULL CHECK (profession IN ('RN', 'RPN', 'PSW', 'RSW')),
  license_number VARCHAR(100),
  hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TRIGGER caregiver_profiles_set_updated_at BEFORE UPDATE ON caregiver_profiles FOR EACH ROW EXECUTE FUNCTION set_updated_at();
