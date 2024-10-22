import { ClipLoader } from 'react-spinners';

// 在按钮部分
<AnimatedButton onClick={handleSearch} className="flex items-center justify-center" disabled={isLoading}>
  {isLoading ? (
    <>
      <ClipLoader color="#ffffff" size={20} className="mr-2" />
      <span>处理中...</span>
    </>
  ) : (
    <>
      <FaSearch className="mr-2" />
      <span>搜索</span>
    </>
  )}
</AnimatedButton>
