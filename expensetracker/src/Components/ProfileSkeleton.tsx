const ProfileSkeleton = () => {
  return (
    <div className="profie-container">
      <div className="form-item">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>

        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="form-item">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>

        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="form-item">
        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse mb-2"></div>

        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="button-group">
        <div className="h-10 w-28 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
