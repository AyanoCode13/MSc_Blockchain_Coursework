import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";

export const useCreateProperty = routeAction$(
  async (data) => {
    return "abc"
  }
  
);

export default component$(() => {
    const createUserAction = useCreateProperty();
    return (
      <section>
        <h1>Create User</h1>
        <Form action={createUserAction}>
          <label>Name
            <input name="name" value={createUserAction.formData?.get('name')} />
          </label>
          <label>Email
            <input name="email" value={createUserAction.formData?.get('email')} />
          </label>
          <button type="submit">Create</button>
        </Form>
        {createUserAction.value && (
          <div>
            <h2>User created successfully!</h2>
          </div>
        )}
      </section>
    )
  });