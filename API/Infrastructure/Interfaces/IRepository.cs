using System.Collections.Generic;

namespace API.Infrastructure.Interfaces {

    public interface IRepository<T> where T : class {

        object Create(T entity);
        void CreateList(List<T> entities);
        void Update(T entity);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);

    }

}