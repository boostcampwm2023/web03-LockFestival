export const SELECT = {
  THEME_DETAIL: [
    'theme.name as themeName',
    'theme.id as themeId',
    'theme.real_genre as realGenre',
    'theme.poster_image_url as posterImageUrl',
    'theme.difficulty as difficulty',
    'theme.min_member as minMember',
    'theme.max_member as maxMember',
    'theme.time_limit as playTime',
    'branch.website as website',
    'branch.phone_number as phone',
    'branch.address as address',
    "CONCAT(branch.branch_name, ' ', brand.brand_name) AS brandBranchName",
  ],
  SIMPLE_THEME_BY_THEME_ID: [
    'theme.id as themeId',
    'theme.name as themeName',
    'theme.poster_image_url as posterImageUrl',
  ],
  THEME_BY_THEME_ID: [
    'theme.id as themeId',
    'theme.name as themeName',
    'theme.poster_image_url as posterImageUrl',
    'branch.branch_name as BranchName',
  ],
};

export const ORDER_BY = {
  QUERY: `CASE WHEN theme.name = :exactQuery THEN 0 
      WHEN theme.name LIKE :startWithQuery THEN 1 
      WHEN theme.name LIKE :containsQuery THEN 2 
      WHEN theme.name LIKE :endsWithQuery THEN 3 
    END`,
};
