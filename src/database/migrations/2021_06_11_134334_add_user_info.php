<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $user = new \App\Models\User();
        $user->name = 'admin';
        $user->email = 'admin@test.com';
        $user->password = \Illuminate\Support\Facades\Hash::make('1111');
        $user->save();

        $role  = new \App\Models\UserRole(['user_id' => $user->id, 'role' => 'Administrator']);
        $user->setRoles(['Administrator']);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
